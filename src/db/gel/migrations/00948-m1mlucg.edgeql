CREATE MIGRATION m1mlucg4ry4ufbxzb72qa6lrsaxp3veters6pvldqhq4kv7p4azddq
    ONTO m1joni75ykkjmlccocxdd3zr7ocrx6fl4f73qhmddhd2kf5anxw3iq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK exprSaveAttributes;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI PROPERTY exprSaveAttrObjects: std::str;
  };
};
