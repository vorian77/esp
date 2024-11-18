CREATE MIGRATION m1bffhy24rphu4vq2u2lqxgcu6aim5enn2psquwj7lemc2zejoimqa
    ONTO m1lbkg5monp5sgb2w2cigfqqxo7723emw3ioptyibum5iurf47fdlq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customElement {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
