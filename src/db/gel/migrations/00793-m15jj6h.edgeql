CREATE MIGRATION m15jj6hgdafmdluer3uojwgybidbmr2puvyek27trxsvrhkixd7kaq
    ONTO m1t2sag3arogp4wwvu4333zxwydwwq7ctuyhziogy4lsbfctgh77sa
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE PROPERTY displayIdSeparator: std::str;
  };
};
