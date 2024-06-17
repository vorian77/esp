CREATE MIGRATION m1lmwig4jw27jp3hkfzat3wswcbvlpabtvdp3xt37b3blfzs5bpkeq
    ONTO m1obd3rzp7zwwncm5msv3b77crhpnvagwxyvb7hvkzra2wv2r4u2kq
{
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      ALTER LINK dataObjConfig {
          RENAME TO dataObjEmbed;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      ALTER LINK dataObjDisplay {
          RENAME TO dataObjModal;
      };
  };
};
