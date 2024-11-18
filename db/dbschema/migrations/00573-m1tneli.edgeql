CREATE MIGRATION m1tneliwx7lpw3yd7uvxpx2vl3gie56rva64s4eqhopel26tcxoioa
    ONTO m14ebvicwfhjwclfnpwffgqxxeplee6rihjpgjwduomisawowfopvq
{
  ALTER TYPE sys_core::SysSystem {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
