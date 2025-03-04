CREATE MIGRATION m13qluuuwh422dauy25db6szslwaknnm2g3c47iwtufromqoxfhbfq
    ONTO m1y2gh5uxcpujg7px3ibliskdvhkxob2rgpbsn4akixfbjix2h2yoq
{
      ALTER TYPE sys_core::SysObj {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
