CREATE MIGRATION m1ybxatj6z72ebbuhdtdhixromrdvaf3dmcrbktq7bfwim3wsmxgfa
    ONTO m1oktynadrjhxqoosy3tjqzw42qldd65tl2iubpcp5ag72orjavvta
{
  DROP FUNCTION sys_core::getObjAttr(ownerName: std::str, name: std::str);
  CREATE FUNCTION sys_core::getObjAttr(codeAttrTypeName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjAttr
      FILTER
          ((.codeAttrType.name = codeAttrTypeName) AND (.name = name))
      ))
  );
};
