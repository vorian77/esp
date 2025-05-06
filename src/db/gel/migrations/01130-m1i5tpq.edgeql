CREATE MIGRATION m1i5tpqndygjildbjjw76yb3jgr5dd4vgecep5t4auqtcd346uoboq
    ONTO m1xm2if57x5unyfjpy4prvaivnukymmlao23siydzqpo3qwo76wvrq
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attrObjAccesses {
          RENAME TO attrsObjAccess;
      };
  };
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attrObjActions {
          RENAME TO attrsObjAction;
      };
  };
};
