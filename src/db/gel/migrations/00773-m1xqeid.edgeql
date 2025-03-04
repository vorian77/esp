CREATE MIGRATION m1xqeid5qrk3vvnoeqxkpxyjcfhdq6ncof3ebjo3c4zespdaeucihq
    ONTO m1b7mzgphiddlzmkm5ukbdjmgmqgkwjna2szaw42j7robe7acv2d4a
{
          CREATE SCALAR TYPE default::orderDefineSequence EXTENDING std::sequence;
  ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      ALTER PROPERTY orderDefine {
          SET TYPE default::orderDefineSequence;
      };
  };
};
