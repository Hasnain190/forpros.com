from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    """Add more fields to default user model."""

    # profile_pic = models.ImageField(upload_to='profile_pics', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True, null=True)




class ProductCatogory(models.Model):
    """ category for products """
    product_category = models.CharField(max_length=200, null=True, blank=True, default='Electronics')

    def __str__(self):
        return self.product_category

class Product(models.Model):
    """Our main product"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey('ProductCatogory', on_delete=models.SET_NULL, null=True)
    description = models.TextField(null=True, blank=True)
    Featured = models.BooleanField(default=False)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    wishList = models.ManyToManyField(User, related_name='WishList')


    def __str__(self):
        return self.name


class Review(models.Model):
    """review added by the user"""
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)



class Order(models.Model):
    """order made by the user"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    '''order item'''
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class WishList(models.Model):
    """wishlist for the user"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user.username)

class ShippingAddress(models.Model):
    """shipping address for the user"""
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True, default='Pakistan')
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


class Media(models.Model):
    """media for the product"""
    product =  models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    bannerImage = models.ImageField(null=True, blank=True,
                               default='/placeholder.png')
    image3 = models.ImageField(null=True, blank=True,
                               default='/placeholder.png')

    image4 = models.ImageField(null=True, blank=True,
                               default='/placeholder.png')
    image5 = models.ImageField(null=True, blank=True,
                               default='/placeholder.png')

    video = models.FileField(null=True, blank=True)

    def __str__(self) -> str:
        return (self.product.name + " 's media Files") 
