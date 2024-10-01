CREATE MIGRATION m1kzzyyfmxqdjctfwxpxakskyj53cugtxgsyl7ml7oxebr62vsxdwq
    ONTO m1enruf4asxfxcnn6i6vpd6z5z3phpadw3ea2xbkz7bpldz4solfya
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY listSuppressSelect: std::bool;
  };
};
