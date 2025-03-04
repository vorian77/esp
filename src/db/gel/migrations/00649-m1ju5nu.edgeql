CREATE MIGRATION m1ju5nuva4c5nm3gtvkysdtlar76qvbazlvd7t74vriuktmx6v5y6q
    ONTO m1jr3babvchxskl2yosxtr4t54f3llngs7uwuebb37b7yry3ot3aaq
{
              CREATE FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          ((.codeType.name = codeTypeName) AND (.name = codeName))
      )
  );
};
