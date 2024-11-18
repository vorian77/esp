CREATE MIGRATION m1mmwac3nzy4wghykedceo6zvc2rlmm4xfv4ya7safmtr37b2eskfq
    ONTO m1bt4dzjqvldtiw6gxqrqyudrf546vcho3kxzkhib6qwo5k76i3nxq
{
  ALTER TYPE sys_core::SysCode {
      DROP LINK owner;
  };
};
