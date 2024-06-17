CREATE MIGRATION m15x7qiyoharw47aiergev7awejy4c45dbe26wnxbwf6nlrgnxuk4q
    ONTO m16uk2nngo524v3vib7xfxfzsizd7onz2kxihtmquzsrtlrmueyl5q
{
  ALTER TYPE sys_rep::SysRepElCol {
      CREATE REQUIRED LINK codeType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
