CREATE MIGRATION m1plzjd3jcgok47lxrurqmkyrgo6sgvvr6y4f6vhj3oqylo5viyxma
    ONTO m1orclkzxhq5zt7we7cvccsfkjdn56motutl2zec57xmlx2ifhs7uq
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP PROPERTY exprDisplay;
      DROP PROPERTY exprWith;
      DROP PROPERTY exprWithProperty;
  };
};
