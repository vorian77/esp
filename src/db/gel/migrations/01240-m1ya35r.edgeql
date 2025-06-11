CREATE MIGRATION m1ya35rfuj6aydgpgbg75ymxmk3qre3pvr454fvshicvbqdsp4laqa
    ONTO m1ebhilulj44xh4p4zl3uq3fov2i6esfvpnn7wck4e6fprnsldla6a
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (SELECT
              sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_code')
          );
      };
      CREATE LINK owner: sys_core::SysSystem {
          SET REQUIRED USING (<sys_core::SysSystem>{.ownerOld});
      };
      DROP EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_core::SysCode {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
