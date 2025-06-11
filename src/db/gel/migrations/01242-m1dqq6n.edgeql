CREATE MIGRATION m1dqq6no7jaudj7qppcxl55tkvay46xutgzl3fqm3x6nsp7ves6eba
    ONTO m1nblxreiqm6sgquck24lw3cyntrp7743muqan3djf22wwh4wzvzta
{
  ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .codeType, .name));
  };
};
