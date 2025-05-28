CREATE MIGRATION m1v6geimpqu6yt365h7mlcwa3vequrcylyxp2v3zpro42vjbrwqbxa
    ONTO m1jaihon7ghp4hk453ig4ohq4xay6l5ej5g7vh6gbaxkbi5kkoruua
{
  DROP FUNCTION sys_core::getAttr(ownerName: std::str, name: std::str, codeAttrType: std::str);
  DROP FUNCTION sys_core::getAttrObj(ownerName: std::str, name: std::str);
  CREATE TYPE sys_core::SysObjAttr EXTENDING sys_core::SysObjAttrEnt {
      CREATE LINK codeAttrType: sys_core::SysCode;
  };
  CREATE FUNCTION sys_core::getObjAttr(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjAttr
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
  DROP FUNCTION sys_user::getUserTypeResource(ownerName: std::str, name: std::str);
  ALTER TYPE sys_core::ObjRoot {
      DROP LINK attrs;
      DROP LINK attrsAccess;
      DROP LINK attrsObjAccess;
      DROP LINK attrsObjAction;
  };
  ALTER TYPE sys_core::SysAttr {
      DROP CONSTRAINT std::exclusive ON ((.obj, .codeAttrType));
      DROP LINK codeAttrType;
      DROP LINK obj;
  };
  DROP TYPE sys_core::SysAttrAccess;
  DROP TYPE sys_core::SysAttr;
  ALTER TYPE sys_core::SysAttrObjAccess {
      DROP LINK obj;
  };
  ALTER TYPE sys_core::SysAttrObjAction {
      DROP LINK obj;
  };
  ALTER TYPE sys_rep::SysRep {
      DROP EXTENDING sys_core::SysAttrObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_user::SysApp {
      DROP EXTENDING sys_core::SysAttrObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_user::SysTask {
      DROP EXTENDING sys_core::SysAttrObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_user::SysUserAction {
      DROP EXTENDING sys_core::SysAttrObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK valueTargetAttribute {
          SET TYPE sys_core::SysObjAttr USING (<sys_core::SysObjAttr>{});
      };
      ALTER LINK valueTriggerAttributes {
          SET TYPE sys_core::SysObjAttr USING (<sys_core::SysObjAttr>{});
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resources {
          SET TYPE sys_core::SysObjAttr USING (<sys_core::SysObjAttr>{});
      };
  };
  DROP TYPE sys_core::SysAttrObj;
  ALTER TYPE sys_core::SysAttrObjAccess RENAME TO sys_core::SysObjAttrAccess;
  ALTER TYPE sys_core::SysAttrObjAction RENAME TO sys_core::SysObjAttrAction;
  ALTER TYPE sys_core::SysObjAttrAccess {
      CREATE REQUIRED LINK obj: sys_core::SysObjAttr {
          SET REQUIRED USING (<sys_core::SysObjAttr>{});
      };
  };
  ALTER TYPE sys_core::SysObjAttrAction {
      CREATE REQUIRED LINK obj: sys_core::SysObjAttr {
          SET REQUIRED USING (<sys_core::SysObjAttr>{});
      };
  };
};
