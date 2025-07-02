CREATE MIGRATION m1h3papv5zl2h42oxrz5l4bchnxgqlpykbofmcryd3s2haobo2v7vq
    ONTO m1hx7s3hoyuza6nhf72s44i6ccwylychisbnascouwy2s2czys5a5a
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeAttrType {
          SET OWNED;
      };
  };
  ALTER TYPE sys_core::SysObjDb {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj'));
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_list_item'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_db::SysColumn {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_db_column'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_db::SysTable {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_db::SysTable {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_db_table'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_user::SysAppHeader {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_app_header'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
