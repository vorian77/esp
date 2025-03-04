CREATE MIGRATION m1cn2lwe533rhb4v5wpatloqbjzyiofuftrsotxsffyjskeobbmx4q
    ONTO m1uvzkut6vnr27qvfwurup5uevejjrigzfcdb5x5ynkfrn2hr7oyfq
{
  ALTER TYPE sys_core::SysSystem {
      CREATE PROPERTY appName: std::str;
      CREATE PROPERTY file: std::json;
      CREATE PROPERTY logoMarginRight: std::float64;
      CREATE PROPERTY logoWidth: std::int16;
  };
};
