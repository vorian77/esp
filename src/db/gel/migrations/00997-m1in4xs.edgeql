CREATE MIGRATION m1in4xsjyrpepxe22f7z7j4kry6fxz2vinxw4fakoax52lxaho2spa
    ONTO m1csgz2y2gorc53mt7knkzlnpaa3ybqjssnpdzcyocftiupmst4i6a
{
  CREATE FUNCTION sys_user::getUserTypeResource(ownerName: std::str, name: std::str) -> OPTIONAL sys_user::SysUserTypeResource USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUserTypeResource
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
  ALTER TYPE sys_rep::SysRep {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::SysUserTypeResource LAST;
  };
  ALTER TYPE sys_user::SysApp {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::SysUserTypeResource LAST;
  };
  ALTER TYPE sys_user::SysTask {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::SysUserTypeResource LAST;
  };
  ALTER TYPE sys_user::SysWidget {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::SysUserTypeResource LAST;
  };
};
