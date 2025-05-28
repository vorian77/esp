CREATE MIGRATION m1dhohwukov4wywttnkdxuc7vtt6rqq3uiimf6lvaqltfjuz2uotga
    ONTO m1wxq37rbpr47htmbeqe3auxmxqtcpeefgf4ntskj4fl6yjjitq3ya
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrsAccess: sys_core::SysObjAttrAccess {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK attrsAction: sys_core::SysObjAttrAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
