CREATE MIGRATION m13yi7sytqpswghnaz55yll6c4omhucifxcvxbzyvwwyl6yzbdvg5a
    ONTO m1e7ey7qd66xabbw4kfp34d2dttvt73uq3s2kk6gnzfklqbig7k6ha
{
              CREATE TYPE org_moed::MoedPPartData EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK participant: org_moed::MoedParticipant;
  };
  CREATE TYPE org_moed::MoedPPartDoc EXTENDING org_moed::MoedPPartData {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY file: std::json;
  };
  CREATE TYPE org_moed::MoedPPartNote EXTENDING org_moed::MoedPPartData {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: cal::local_date;
  };
};
