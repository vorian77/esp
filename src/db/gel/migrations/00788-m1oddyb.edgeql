CREATE MIGRATION m1oddybokwursot6jehjqgcckb6styc44kn4r3xurtmqwifxfsxfrq
    ONTO m1d2lrykeifktfm47cr6tavrgmdpnuslqkzsq6agjkwkdhyypmiczq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK propsNew;
  };
};
