CREATE MIGRATION m1llgz4u6gneer7iwsrmweoeowepgvtnbpol53cblq2xh3t4rgq3wq
    ONTO m1e37cxv3pn3pwd3pfbntwxdd6obrcetlkzfdthzkwliaf35uybx3a
{
              ALTER TYPE sys_user::SysUserTypeResourceSubject {
      ALTER LINK resource {
          SET TYPE sys_core::SysObj USING (.resource[IS sys_core::SysObj]);
      };
  };
};
