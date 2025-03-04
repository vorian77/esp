CREATE MIGRATION m1p2dmmueubsa27hbou5o67coppy3zsrzrd7dtyeocitzmrcafzuzq
    ONTO m1mqapgqpogo4v7ng6j4njqe7uxfto74zzmc7iccmvs7efwkue5exa
{
              CREATE TYPE default::SysFile {
      CREATE REQUIRED PROPERTY fileName: std::str;
      CREATE REQUIRED PROPERTY fileType: std::str;
      CREATE REQUIRED PROPERTY key: std::str;
  };
};
