CREATE MIGRATION m1ph7ff64z2z34zwphavx6gxevfoqjimfzqkol5ijpmfdoqc6boyvq
    ONTO m1nwshuwmk4iejspxkhwpuqloj5jou643s7ktcrzvz5466rbow5kva
{
              ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeActionFieldType {
          RENAME TO codeTokenAction;
      };
  };
};
