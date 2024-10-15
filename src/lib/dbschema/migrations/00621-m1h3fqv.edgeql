CREATE MIGRATION m1h3fqvrhmxzgvqwgp2fja4a5xn3qquzz6sces2s2vxtin43f6x63q
    ONTO m1qlycbewutnmuarscmdy5qpi3ajc4a44s7kc4wnugztwmubq256wq
{
  DROP FUNCTION sys_core::getSystem(name: std::str);
  ALTER TYPE sys_core::SysSystem {
      DROP CONSTRAINT std::exclusive ON (.name);
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
