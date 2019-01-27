export const coalesce = () => ({
  name: 'coalesce',
  aliases: ['cl'],
  type: 'string',
  help: 'Finds the first non empty column or default value if all are empty',
  context: {
    types: ['datatable'],
  },
  args: {
    _: {
      types: ['string'],
      aliases: ['column', 'c'],
      help: 'The name of the column value to read',
      multi: true,
    },
    row: {
      types: ['number'],
      aliases: ['r'],
      help: 'The row number, starting at 0',
      default: 0,
    },
    default: {
      types: ['string'],
      aliases: ['d'],
      help: 'The default value if no columns have a value',
      required: true,
    },
  },
  fn: (context, args) => {
    const columns = args._ || [];
    let value = args.default;
    const row = context.rows[args.row];

    if (!row) throw new Error(`Row not found: ${args.row}`);

    columns.some(column => {
      const existing_column = context.columns.find(col => col.name === column);
      if (!existing_column) return false;
      if (!row[column]) return false;
      value = row[column];
      return true;
    });

    return value;
  },
});
