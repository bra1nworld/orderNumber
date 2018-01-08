declare type OrderNumber = string;
declare namespace OrderNumber {
    const minInSpace: string;
    const maxInSpace: string;
    /**
     * a>b => 1
     * a<b =>-1
     * a=b =>0
     * @export
     * @param {OrderNumber} a
     * @param {OrderNumber} b
     * @returns {(1 | 0 | -1)}
     */
    function compare(a: OrderNumber, b: OrderNumber): 1 | 0 | -1;
    /**
     * equally distributed
     *
     * @static
     * @param {string} a        start
     * @param {string} b        end
     * @param {number} count    between count
     * @returns {string[]}
     * @memberof SortClass
     */
    function between(a: OrderNumber, b: OrderNumber, count: number): OrderNumber[];
}
export = OrderNumber;
