CREATE MIGRATION m1bulr2wvhidnp27hfv7rgdykdpgciz26pwf5mkobc56cwzsu5xpma
    ONTO m1tis3m2abj52i2bb7h3s57avcky5gjpkjrrxie22ho742z2enptbq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK codeType {
          RENAME TO codeQueryAction;
      };
  };
};
