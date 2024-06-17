CREATE MIGRATION m14wwhzxydj5jfs6pbe4pzx27pfl5csb63hy5usypphfoq32p4vk5a
    ONTO m1vacbdrhwa7kikxy6ka32xzodaxmbls54wos3donblhnaeut5fewq
{
  CREATE ALIAS sys_user::test := (
      SELECT
          sys_core::SysObj
  );
};
