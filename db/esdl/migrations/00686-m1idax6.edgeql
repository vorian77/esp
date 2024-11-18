CREATE MIGRATION m1idax6xmowojipz2osymv6gre4kyhk54qcemnzxa5swuervrf4n4a
    ONTO m1pdndk2jl37pxeriu7ufbrr7bt7dcc7avh6mnqgpfu6s33nm5hp7q
{
  ALTER TYPE sys_core::SysCode {
      DROP CONSTRAINT std::exclusive ON ((.codeType, .name));
  };
  ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .codeType, .name));
  };
};
