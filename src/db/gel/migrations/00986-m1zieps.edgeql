CREATE MIGRATION m1ziepszrkru74zumcysc7yl2by5xkkemzl5ookslom72llyh75xoq
    ONTO m12orafzg2tzhm2s2vkyqw552eh2andoske3f76c33qehd7wibdfoa
{
  ALTER FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str) USING (SELECT
      objName
  );
};
