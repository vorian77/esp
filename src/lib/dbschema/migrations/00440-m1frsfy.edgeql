CREATE MIGRATION m1frsfywolwxpdt34segwshnmzoxb4nc4rz5iu7svoj5hl7uir7gxq
    ONTO m1tlf4keyx4bfravcqvnj5c2d3gktxdfeo5ws7y62bcunqu47kkdja
{
  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER PROPERTY ordersDisplay {
          RENAME TO orderDisplay;
      };
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER PROPERTY orderDisplay {
          RESET OPTIONALITY;
      };
  };
};
