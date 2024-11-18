CREATE MIGRATION m1vacbdrhwa7kikxy6ka32xzodaxmbls54wos3donblhnaeut5fewq
    ONTO m1kipdzomhxpqbs4waam3vepuucxachm5qo4mxanut5bwcjoc6ha7q
{
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK tags {
          RENAME TO userTypeTags;
      };
  };
};
