CREATE MIGRATION m1lbkg5monp5sgb2w2cigfqqxo7723emw3ioptyibum5iurf47fdlq
    ONTO m126p5ynf6dkqao625zp2xj4de2x2ex7qvup7pm64fcssmqdk6jcta
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkCardinality;
  };
};
