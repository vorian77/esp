CREATE MIGRATION m17njsfukdfuz27cmgzzg6kqgfdfmkqsioc3ixtubcfej2iqjjzoja
    ONTO m1dqq6no7jaudj7qppcxl55tkvay46xutgzl3fqm3x6nsp7ves6eba
{
  ALTER FUNCTION sys_core::getCodeSystem(sysName: std::str, codeTypeName: std::str, codeName: std::str) USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          (((.owner.name = sysName) AND (.codeType.name = codeTypeName)) AND (.name = codeName))
      )
  );
  ALTER TYPE sys_core::SysCode {
      DROP LINK ownerOld;
  };
};
