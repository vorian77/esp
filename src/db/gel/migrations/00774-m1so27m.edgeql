CREATE MIGRATION m1so27mx7xvpap5bzl2s7zuatwx43hskkvwmy5lvg2cudvnah3abeq
    ONTO m1xqeid5qrk3vvnoeqxkpxyjcfhdq6ncof3ebjo3c4zespdaeucihq
{
          ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      ALTER PROPERTY orderDefine {
          SET TYPE default::nonNegative USING ({0});
      };
  };
  DROP SCALAR TYPE default::orderDefineSequence;
};
