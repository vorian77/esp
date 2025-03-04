CREATE MIGRATION m1e37cxv3pn3pwd3pfbntwxdd6obrcetlkzfdthzkwliaf35uybx3a
    ONTO m12ug7ws7clnwylza2jwhvbs5wlp2hn7nwfrvtnzaq6teqf5ipisxa
{
              ALTER TYPE sys_user::SysUserTypeResourceSubject {
      DROP PROPERTY idSubject;
  };
};
