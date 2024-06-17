CREATE MIGRATION m1thksqpukdabcu3lynzfv76uklo2kvdcjv6jevoj5sg7ynkhw452a
    ONTO m1smmc4taelth3sfd4rkpphidv46cylfgxtubvejx45ohwbucpyqma
{
  CREATE ALIAS sys_user::SysUserTypeResourceObjects := (
      SELECT
          sys_user::SysWidget
  );
};
