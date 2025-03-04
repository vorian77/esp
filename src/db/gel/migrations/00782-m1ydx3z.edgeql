CREATE MIGRATION m1ydx3zdcksvvn6yzfrrmefrzhahgpyrfg4mttlh6evggs5iktrmha
    ONTO m1sw2wzacwyrgvwo4rjm6xhwso6nwkimiitljsvlgqsbhoc7aje52a
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK props {
          RESET CARDINALITY USING (SELECT
              .props 
          LIMIT
              1
          );
      };
  };
};
