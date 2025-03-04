CREATE MIGRATION m1qlycbewutnmuarscmdy5qpi3ajc4a44s7kc4wnugztwmubq256wq
    ONTO m1lzstl3gw5nwhviubvj4syn6glxo26loa42tatg6dfdos47r7ijwa
{
              ALTER TYPE sys_core::SysOrg {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
};
