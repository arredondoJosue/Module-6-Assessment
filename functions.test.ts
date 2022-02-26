const {shuffleArray} = require('./utils')

let randomArr = [0,9,8,7,6,5,4,3,2,1]

describe('shuffleArray should', () => {
    test('have contents shuffled around', () => {
        expect(shuffleArray(randomArr)).not.toBe(randomArr)        
    })

    it('have the same length as the array passed in', () => {
        expect(shuffleArray(randomArr)).toHaveLength(10)
    })
})

