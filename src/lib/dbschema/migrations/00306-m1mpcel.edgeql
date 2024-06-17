CREATE MIGRATION m1mpcelxxctwnuu2lk33rhaceyhbnszdebjvdehszlrhifdlamd6kq
    ONTO m1skspfrasxz5apf3ozfr6btcmfzmlq6klnttr4blobly6wmpdj5iq
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK codeType;
  };
};
