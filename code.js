// Kane Kriz
// UWYO COSC 3020 Algorithms
// TSP Local Search Exercise - primary js file
// 1 May 2025
//



//


function tsp_ls(cityDistanceMatrix) 
{
    //early checks
    if((cityDistanceMatrix == null) || (cityDistanceMatrix.length == 0)) 
    {
        return -1;
    }

    if(cityDistanceMatrix.length == 1) 
    {
        return 0;
    }

    
    //

    
    var numCities = cityDistanceMatrix.length;
    var currentPath = [];
    var newPath = [];
    
    var shortestDistance = null;
    var currentDistance = null;
    var newDistance = null;
    
    var repeatCount = 0;
    var totalIterations = 0;

    //max bounds that guarantee that this thing stops and doesnt get infinitely stuck without improvement...
    //otherwise runs very long and annoying of course if not infinite
    //-idea from the local search wiki article attatched in the readme
    var maxRepeatCount = 1000;    
    var maxTotalIterations = 10000;

    
    //

    
    for(var i = 0; i < numCities; i++) 
    {
        currentPath[i] = i;
    }

    for(var i = numCities - 1; i > 0; i--) 
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = currentPath[i];
        
        currentPath[i] = currentPath[j];
        currentPath[j] = temp;
    }

    currentDistance = 0;
    
    for(var i = 0; i < numCities - 1; i++) 
    {
        var prevCity = currentPath[i];
        var currentCity = currentPath[i + 1];
        
        if(cityDistanceMatrix[prevCity][currentCity] < 0) 
        {
            currentDistance = null;
            break;
        }
        
        currentDistance += cityDistanceMatrix[prevCity][currentCity];
    }
    shortestDistance = currentDistance;

    while((repeatCount < maxRepeatCount) && (totalIterations < maxTotalIterations)) 
    {
        totalIterations++;

        var i = Math.floor(Math.random() * (numCities - 1));
        var k = i + 1 + Math.floor(Math.random() * (numCities - i - 1));

        for(var j = 0; j < i; j++) 
        {
            newPath[j] = currentPath[j];
        }
        
        for(var j = i; j <= k; j++) 
        {
            newPath[j] = currentPath[k - (j - i)];
        }
        
        for(var j = k + 1; j < numCities; j++) 
        {
            newPath[j] = currentPath[j];
        }

        newDistance = 0;
        
        for(var j = 0; j < numCities - 1; j++) 
        {
            var prevCity = newPath[j];
            var currentCity = newPath[j + 1];
            
            if(cityDistanceMatrix[prevCity][currentCity] < 0) 
            {
                newDistance = null;
                break;
            }
            
            newDistance += cityDistanceMatrix[prevCity][currentCity];
        }

        if(newDistance != null) 
        {
            if(currentDistance == null) 
            {
                for(var j = 0; j < numCities; j++) 
                {
                    currentPath[j] = newPath[j];
                }
                
                currentDistance = newDistance;
                shortestDistance = newDistance;
                repeatCount = 0;
            }
                
            else if(newDistance < currentDistance) 
            {
                for(var j = 0; j < numCities; j++) 
                {
                    currentPath[j] = newPath[j];
                }
                
                currentDistance = newDistance;
                
                if(shortestDistance == null || (newDistance < shortestDistance)) 
                {
                    shortestDistance = newDistance;
                }
                
                repeatCount = 0;
            }
                
            else 
            {
                repeatCount++;
            }
        }
            
        else 
        {
            repeatCount++;
        }
    }

       if(shortestDistance != null)
       {
        return shortestDistance;
        } 
           
       else 
       {
        return -1;
        }
}


//
