CREATE MIGRATION m1skspfrasxz5apf3ozfr6btcmfzmlq6klnttr4blobly6wmpdj5iq
    ONTO m1plzjd3jcgok47lxrurqmkyrgo6sgvvr6y4f6vhj3oqylo5viyxma
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP PROPERTY exprSelect;
  };
};
