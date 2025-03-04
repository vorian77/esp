CREATE MIGRATION m13vgcuyi2j5idrf47tcyqdhw5ofrlcoyuzovwjd72ea2tvunr3a6q
    ONTO m15jj6hgdafmdluer3uojwgybidbmr2puvyek27trxsvrhkixd7kaq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP PROPERTY exprPropDisplay;
  };
};
