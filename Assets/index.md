# Quick Infos

## Avaiable Structures per RCL

| RCL | Road      | Container | Spawn | Extension | Energy Ava | Rampart   | Wall | Tower | Storage | Link | Extraktor | Lab | Terminal | Observer | PowerSPawn |
|-----|-----------|-----------|-------|-----------|------------|-----------|------|-------|---------|------|-----------|-----|----------|----------|------------|
| 0   | 0         | 5         | 1     | 0         | 0          | 0         | 0    | 0     | 0       | 0    | 0         | 0   | 0        | 0        | 0          |
| 1   | 200       | 5         | 1     | 0         | 300        | 0         | 0    | 0     | 0       | 0    | 0         | 0   | 0        | 0        | 0          |
| 2   | 45000     | 5         | 1     | 5         | 550        | 300000    | 1    | 0     | 0       | 0    | 0         | 0   | 0        | 0        | 0          |
| 3   | 135000    | 5         | 1     | 10        | 800        | 1000000   | 1    | 1     | 0       | 0    | 0         | 0   | 0        | 0        | 0          |
| 4   | 405000    | 5         | 1     | 20        | 1300       | 3000000   | 1    | 1     | 1       | 0    | 0         | 0   | 0        | 0        | 0          |
| 5   | 1215000   | 5         | 1     | 30        | 1800       | 10000000  | 1    | 2     | 1       | 2    | 0         | 0   | 0        | 0        | 0          |
| 6   | 3645000   | 5         | 1     | 40        | 2300       | 30000000  | 1    | 2     | 1       | 3    | 1         | 3   | 1        | 0        | 0          |
| 7   | 10935000  | 5         | 2     | 50        | 2800       | 100000000 | 1    | 3     | 1       | 4    | 1         | 6   | 1        | 0        | 0          |
| 8   | 999999999 | 5         | 3     | 60        | 3300       | 300000000 | 1    | 6     | 1       | 6    | 1         | 10  | 1        | 1        | 1          |

[Table done with CsvToMarkdownTable][1]

## TypeDpc Comments

### Functions

<pre><code>
/**
 * Comment for method ´doSomething´.
 * @param target  Comment for parameter ´target´.
 * @returns       Comment for return value.
 */
function doSomething(target:any, arg:any):number {
    return 0;
}
</code></pre>

### Types / Class

<pre><code>
/** Description of MyType interface */
interface MyType {
    /** This property is ... */
    haha: number,
    /** Optional property useful for ... */
    optional?: string
}

/**
 * Description of what MyClass is
 */
class MyClass{
    /**
     * @param config Docs on config property.It is different than the interface docs
     */
    constructor(private config: MyType) {
    }
}
</code></pre>

[1]:https://donatstudios.com/CsvToMarkdownTable
