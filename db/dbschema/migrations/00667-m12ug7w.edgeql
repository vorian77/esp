CREATE MIGRATION m12ug7ws7clnwylza2jwhvbs5wlp2hn7nwfrvtnzaq6teqf5ipisxa
    ONTO m1mos33dk2rq3okpeu53tyk2vrzgubv3fhvmtv7qjgccpryiq7vaia
{
  ALTER TYPE sys_user::SysUserTypeResource RENAME TO sys_user::SysUserTypeResourceSubject;
};
