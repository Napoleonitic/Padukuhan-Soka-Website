create extension if not exists pgcrypto;

create or replace function public.ensure_named_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(coalesce(new.email, '')) = 'admin@soka.id' then
    insert into public.admins (user_id, display_name)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'name', 'Admin Soka')
    )
    on conflict (user_id) do update
    set display_name = excluded.display_name;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_assign_admin on auth.users;
create trigger on_auth_user_created_assign_admin
after insert on auth.users
for each row
execute function public.ensure_named_admin();

insert into public.admins (user_id, display_name)
select
  id,
  coalesce(raw_user_meta_data ->> 'name', 'Admin Soka')
from auth.users
where lower(coalesce(email, '')) = 'admin@soka.id'
on conflict (user_id) do update
set display_name = excluded.display_name;
