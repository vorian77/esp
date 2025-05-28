CREATE MIGRATION m1xftr5lmuag5mefk6i4yipooou44n5vqb3tp6wrdfi3h52arso4rq
    ONTO m1xeiemfqfxjs2asfk4kz5p2tzjxgrmzymq3o3p7ijv5x4w2ajmeka
{
  CREATE FUNCTION sys_core::getCodeAttrType(codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          ((.codeType.name = 'ct_sys_obj_attr_type') AND (.name = codeName))
      )
  );
  ALTER FUNCTION sys_core::getObjAttr(ownerName: std::str, name: std::str) {
      RENAME TO sys_core::getObjAttrType;
  };
};
