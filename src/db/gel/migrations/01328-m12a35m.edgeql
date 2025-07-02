CREATE MIGRATION m12a35maioewya5ze5iv3dg7ndvn23ms3ks327mkoinyuaonyixbmq
    ONTO m1h3papv5zl2h42oxrz5l4bchnxgqlpykbofmcryd3s2haobo2v7vq
{
  ALTER TYPE sys_core::SysDataObjActionGroup {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_action_group'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_config'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_select'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_data_obj_field_embed_list_edit'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_core::SysNodeObj {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_node_obj'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
